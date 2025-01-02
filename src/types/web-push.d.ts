declare module 'web-push' {
  const generateVAPIDKeys: () => { publicKey: string; privateKey: string };
  const setVapidDetails: (subject: string, publicKey: string, privateKey: string) => void;
  const sendNotification: (subscription: any, payload?: string | null, options?: any) => Promise<void>;
  export { generateVAPIDKeys, setVapidDetails, sendNotification };
}
