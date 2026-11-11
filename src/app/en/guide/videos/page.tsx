import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import VideoTutorialsView from "@/views/VideoTutorialsView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/guide/videos",
  title: dict.metadata.guideVideos.title,
  description: dict.metadata.guideVideos.description,
});

export default function GuideVideosPage() {
  return <VideoTutorialsView dict={dict} locale="en" />;
}
