import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAllTracks } from "@/utils/study";
import StudyIndexView from "@/views/StudyIndexView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/study",
  title: dict.study.metadata.title,
  description: dict.study.metadata.description,
});

const Study = () => {
  const tracks = getAllTracks("en");

  return <StudyIndexView dict={dict} locale="en" tracks={tracks} />;
};

export default Study;
