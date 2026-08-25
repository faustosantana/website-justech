import { ResourcePage, resourceMeta } from "@/components/v8/ResourcePage";

export const metadata = resourceMeta("equipos");

export default function Page() {
  return <ResourcePage slug="equipos" />;
}
