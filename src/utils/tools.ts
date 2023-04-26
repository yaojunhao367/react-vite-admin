/**
 * 图片上传前校验
 * @param file 上传的文件
 * @param width 上传限制的宽度（px）
 * @param height 上传限制的高度（px）
 * @param size 上传限制的大小（kb）
 * @returns 报错文案
 */
export const checkImage = (
  file: any,
  width: number,
  height: number,
  size: number
) => {
  return new Promise<void>((resolve, reject) => {
    const fileSize = file.size / 1024 > size;
    if (fileSize) {
      reject(`${size}kb以下の画像をアップロードしてください`);
    } else {
      let filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = (e: any) => {
        let src = e.target.result;
        const image: any = new Image();
        image.src = src;
        image.onload = () => {
          if (image.width > width || image.height > height) {
            // 上传图片的宽高与传递过来的限制宽高作比较，超过限制则调用失败回调
            reject(
              `${width}px*${height}px以下の画像をアップロードしてください`
            );
          } else {
            resolve();
          }
        };
        image.onerror = reject;
      };
    }
  });
};
