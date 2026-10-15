import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getTrack, getTrackSlugs } from "@/utils/study";
import StudyTrackView from "@/views/StudyTrackView";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const dict = getDictionary("vi");

export function generateStaticParams() {
  return getTrackSlugs("vi").map((track) => ({ track }));
}

type Props = {
  params: Promise<{ track: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track } = await params;
  const current = getTrack("vi", track);

  if (!current) {
    return {
      title: dict.study.notFound.title,
      robots: { index: false, follow: false },
    };
  }

  return pageMetadata({
    locale: "vi",
    path: `/study/${track}`,
    title: current.title,
    description: current.description,
  });
}

export default async function StudyTrackPage({ params }: Props) {
  const { track } = await params;
  const current = getTrack("vi", track);

  if (!current) {
    notFound();
  }

  return <StudyTrackView dict={dict} locale="vi" track={current} />;
}
