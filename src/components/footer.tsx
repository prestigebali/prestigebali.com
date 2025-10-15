export function Footer() {
  return (
    <footer className="py-8 md:py-12 bg-background border-t">
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Prestige Bali. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/80">
          Crafting premium leisure and tour experiences in Indonesia.
        </p>
      </div>
    </footer>
  );
}
