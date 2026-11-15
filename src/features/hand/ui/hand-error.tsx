export const HandError = ({ message }: { message: string }) => (
  <p className="text-danger mb-4 text-sm" role="alert">
    {message}
  </p>
);
