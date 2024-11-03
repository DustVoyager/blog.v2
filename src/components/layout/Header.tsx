import Link from "next/link";

export default function Header() {
  return (
    <header>
      <h1>
        <Link href="/">Dust Voyager</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
