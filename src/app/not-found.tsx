import Link from "next/link";

import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-foreground/70">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="mt-6 inline-block underline underline-offset-4">
        Back to home
      </Link>
    </Container>
  );
}
