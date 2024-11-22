import instance from '@/common/services/instance';
import axios from 'axios';

interface UploadFile {
  name: string;
  type: string;
}

export const apiUploadImageGcpPost = async (data: { fileName: string; type: string }) => {
  const url = `/upload/image/gcp`;
  return instance.post(url, data);
};

export const uploadFileToStorage = async (file: UploadFile) => {
  const resData = await apiUploadImageGcpPost({
    fileName: file.name,
    type: file.type,
  });

  const putUrl = resData.data;

  await axios.put(putUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });

  return putUrl.split('?')[0];
};
