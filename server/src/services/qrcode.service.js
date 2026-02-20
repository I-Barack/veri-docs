import QRCode from "qrcode";

export const generateQRCode = async (documentID) => {
  const url = `${process.env.API_BASE_URL}/verify/${documentID}`;
  return await QRCode.toDataURL(url);
};
