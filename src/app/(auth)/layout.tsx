// TODO:
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
    // <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
    //   {children}
    // </div>
  );
}
