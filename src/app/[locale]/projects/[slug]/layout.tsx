import type { ReactNode } from "react";
import { EngineeringRecordEnterMotion } from "@/components/modules/engineering-record";

type ProjectDetailLayoutProps = {
  children: ReactNode;
};

export default function ProjectDetailLayout({
  children,
}: ProjectDetailLayoutProps) {
  return (
    <EngineeringRecordEnterMotion>{children}</EngineeringRecordEnterMotion>
  );
}
