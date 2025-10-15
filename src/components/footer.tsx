export function Footer() {
  return (
    <footer className="py-8 md:py-12 bg-background border-t">
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Voyage Zen. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/80">
          Crafting minimalist travel experiences for the modern explorer.
        </p>
      </div>
    </footer>
  );
}
