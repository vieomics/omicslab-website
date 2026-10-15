import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAllStudyParams, getStudyLesson } from "@/utils/study";
import StudyLessonView from "@/views/StudyLessonView";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const dict = getDictionary("vi");

export function generateStaticParams() {
  return getAllStudyParams("vi");
}

type Props = {
  params: Promise<{ track: string; lesson: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track, lesson } = await params;
  const data = await getStudyLesson(
    "vi",
    track,
    lesson,
    dict.study.figurePlaceholder,
  );

  if (!data) {
    return {
      title: dict.study.notFound.title,
      robots: { index: false, follow: false },
    };
  }

  return pageMetadata({
    locale: "vi",
    path: `/study/${track}/${lesson}`,
    title: data.lesson.title,
    description: data.lesson.description,
  });
}

export default async function StudyLessonPage({ params }: Props) {
  const { track, lesson } = await params;
  const data = await getStudyLesson(
    "vi",
    track,
    lesson,
    dict.study.figurePlaceholder,
  );

  if (!data) {
    notFound();
  }

  return (
    <StudyLessonView
      dict={dict}
      locale="vi"
      track={data.track}
      lesson={data.lesson}
      index={data.index}
      content={data.content}
      headings={data.headings}
      related={data.related}
    />
  );
}
