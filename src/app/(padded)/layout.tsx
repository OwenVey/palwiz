export default function PaddedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="mx-auto max-w-7xl p-4">{children}</main>;
}
