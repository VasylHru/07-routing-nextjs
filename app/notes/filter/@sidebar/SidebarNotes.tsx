import css from "@/components/SidebarNotes/SidebarNotes.module.css";
import Link from "next/link";



export default function SidebarNotes() {
  const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>

      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
