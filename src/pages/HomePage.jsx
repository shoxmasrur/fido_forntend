import { contentService } from '../services/contentService';
import { useContent } from '../hooks/useContent';
import PageState from '../components/ui/PageState';
import Hero from '../components/home/Hero';
import Metrics from '../components/home/Metrics';
import Industries from '../components/home/Industries';
import Methodology from '../components/home/Methodology';
import Clients from '../components/home/Clients';
import Cases from '../components/home/Cases';
import Insights from '../components/home/Insights';

export default function HomePage() {
  const { data, error, lang, retry } = useContent(contentService.getHome);

  if (!data) return <PageState error={error} onRetry={retry} />;

  return (
    <>
      <Hero data={data.hero} />
      <Metrics data={data.metrics} />
      <Industries data={data.industries} />
      <Methodology data={data.methodology} />
      <Clients data={data.clients} />
      <Cases data={data.cases} />
      <Insights data={data.insights} lang={lang} />
    </>
  );
}
