import { ListObjectsCommandOutput } from '@aws-sdk/client-s3';
import { S3ImageObject } from '../../@types';

const SAFE_IMAGE_REGEX = new RegExp(/.+\.(jpg|jpeg|png)/g);

function getImageParentDir(key: string) {
    if (key.includes('chief')) return 'chief';
    if (key.includes('dumpling')) return 'dumpling';
    return 'brothers';
}

export function filterS3ObjectsOnFileCriteria(bucketObjects: ListObjectsCommandOutput){
    const { Contents: objectArray } = bucketObjects;
    const filteredObjects: S3ImageObject[] = [];
    if (typeof objectArray === 'undefined') return [];
    for (const s3Obj of objectArray) {
        if (s3Obj.Key && SAFE_IMAGE_REGEX.test(s3Obj.Key)) {
            const s3ImageObject: S3ImageObject = {
                key: s3Obj.Key,
                caption: 'Some mock caption for now',
                parentDir: getImageParentDir(s3Obj.Key),
                url: process.env.AWS_CLOUDFRONT_DISTRIBUTION_URL!.concat(s3Obj.Key)
            }
            filteredObjects.push(s3ImageObject);
        }
    }
    return filteredObjects;
}

export function filterImagesOnParentDir(parentDirKey: 'chief' | 'dumpling' | 'home' | 'upload', s3ObjArray: S3ImageObject[]){
   if (parentDirKey === 'upload') return s3ObjArray;
   if (parentDirKey === 'home') return s3ObjArray.filter(s3Obj => s3Obj.key.includes('brothers'));
   return s3ObjArray.filter(s3Obj => s3Obj.key.includes(parentDirKey));
}