import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAllTracks } from "@/utils/study";
import StudyIndexView from "@/views/StudyIndexView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/study",
  title: dict.study.metadata.title,
  description: dict.study.metadata.description,
});

const Study = () => {
  const tracks = getAllTracks("vi");

  return <StudyIndexView dict={dict} locale="vi" tracks={tracks} />;
};

export default Study;
