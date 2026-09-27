import userData from "@/config/userData";
import { ConnectButtons } from "../ui/connect-links";
import CopyButton from "../ui/copy-button";
import GitHubGraph from "../ui/github-graph";
import LastUpdated from "../ui/last-updated";

const Footer = ({ graph = true }: { graph?: boolean }) => {
  const { email } = userData.personalInfo;

  return (
    <div className="w-full max-w-4xl mx-auto border-dashed sm:pb-0 pb-8">
      <div className="p-4 max-w-screen-xl w-full mx-auto space-y-4 py-8 md:py-16">
        {graph && <GitHubGraph profileSrc="/pfp.jpg" />}
        <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-1 items-start md:items-end mt-8">
        <div className="flex-col text-start text-muted-foreground">
          <p className="font-cursive text-5xl">
            Omesh
          </p>
          <LastUpdated />
        </div>
          <div className="md:grow hidden border-b border-dashed border-border" />
          <div className="flex flex-col items-start md:items-end gap-2">
            <ConnectButtons />
            <CopyButton email={email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
