export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="mx-auto mt-20 max-w-3xl">{children}</div>;
}
