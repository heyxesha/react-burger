export default interface IActionResponseData {
    success: boolean;
    error?: Error | string;
    accessToken?: string;
};
