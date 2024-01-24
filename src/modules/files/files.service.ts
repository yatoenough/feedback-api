import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Response } from 'express';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  private AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  private s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File not attached');
    }

    const ext = file.originalname.split('.').pop();
    const filename = `${uuid.v4()}.${ext}`;

    file.originalname = filename;

    await this.handleUpload(
      file.buffer,
      this.AWS_S3_BUCKET,
      `static/${file.originalname}`,
      file.mimetype,
    );

    return file.originalname;
  }

  async getFile(fileName: string, res: Response) {
    const options = {
      Bucket: this.AWS_S3_BUCKET,
      Key: `${fileName}`,
    };

    res.attachment(options.Key);

    const file = this.s3.getObject(options);

    const fileStream = file.createReadStream();
    fileStream.on('error', (err) => {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ statusCode: res.statusCode, error: err.message });
    });

    fileStream.pipe(res);
  }

  async deleteFile(file: string) {
    const options = {
      Bucket: this.AWS_S3_BUCKET,
      Key: `${file}`,
    };

    try {
      await this.s3.headObject(options).promise();
      try {
        await this.s3.deleteObject(options).promise();
      } catch (e) {
        throw new HttpException(
          `Error in file deleting: ${e}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (e) {
      return;
    }
  }

  private async handleUpload(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: name,
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'eu-central-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
