import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { useLanguage } from "../../context/LanguageContext";

export default function LoadingContent({
}) {
    const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="outline" disabled size="sm">
        <Spinner className="size-4 text-primary" />
        {t.loading}
      </Button>
    </div>
  )
}