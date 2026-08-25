import { ResourcePage, resourceMeta } from "@/components/v8/ResourcePage";

export const metadata = resourceMeta("wifi");

export default function Page() {
  return <ResourcePage slug="wifi" />;
}
