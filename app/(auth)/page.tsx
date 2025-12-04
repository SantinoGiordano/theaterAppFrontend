import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (

          <div className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Login <Link href="/home" className="text-blue-600 hover:underline">Home</Link>
            Register <Link href="/home" className="text-blue-600 hover:underline">Register</Link>
          </div>
  );
}
