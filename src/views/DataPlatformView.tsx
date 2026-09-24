import Contact from "@/components/Contact";
import RichText from "@/components/Common/RichText";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";

const featureIcons = [
  <svg
    key="storage"
    viewBox="0 0 35 35"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d="M30.559,13.4H4.441A4.2,4.2,0,0,1,.25,9.206V4.441A4.2,4.2,0,0,1,4.441.25H30.559A4.2,4.2,0,0,1,34.75,4.441V9.206A4.2,4.2,0,0,1,30.559,13.4ZM4.441,2.75A1.693,1.693,0,0,0,2.75,4.441V9.206A1.693,1.693,0,0,0,4.441,10.9H30.559a1.693,1.693,0,0,0,1.691-1.69V4.441A1.693,1.693,0,0,0,30.559,2.75Z" />
    <path d="M8.174,8.9a1.25,1.25,0,0,1-1.25-1.25v-2a1.25,1.25,0,0,1,2.5,0v2A1.25,1.25,0,0,1,8.174,8.9Z" />
    <path d="M27.067,8.323a1.5,1.5,0,0,0,0-3,1.5,1.5,0,0,0,0,3Z" />
    <path d="M22.067,8.323a1.5,1.5,0,0,0,0-3,1.5,1.5,0,0,0,0,3Z" />
    <path d="M30.559,24.074H4.441A4.2,4.2,0,0,1,.25,19.882V15.118a4.2,4.2,0,0,1,4.191-4.191H30.559a4.2,4.2,0,0,1,4.191,4.191v4.764A4.2,4.2,0,0,1,30.559,24.074ZM4.441,13.427A1.693,1.693,0,0,0,2.75,15.118v4.764a1.694,1.694,0,0,0,1.691,1.692H30.559a1.694,1.694,0,0,0,1.691-1.692V15.118a1.693,1.693,0,0,0-1.691-1.691Z" />
    <path d="M8.174,19.577a1.25,1.25,0,0,1-1.25-1.25v-2a1.25,1.25,0,1,1,2.5,0v2A1.25,1.25,0,0,1,8.174,19.577Z" />
    <path d="M30.559,34.75H4.441A4.2,4.2,0,0,1,.25,30.559V25.794A4.2,4.2,0,0,1,4.441,21.6H30.559a4.2,4.2,0,0,1,4.191,4.19v4.765A4.2,4.2,0,0,1,30.559,34.75ZM4.441,24.1a1.693,1.693,0,0,0-1.691,1.69v4.765A1.693,1.693,0,0,0,4.441,32.25H30.559a1.693,1.693,0,0,0,1.691-1.691V25.794a1.693,1.693,0,0,0-1.691-1.69Z" />
    <path d="M8.174,30.253A1.25,1.25,0,0,1,6.924,29V27a1.25,1.25,0,0,1,2.5,0v2A1.249,1.249,0,0,1,8.174,30.253Z" />
  </svg>,
  <svg
    key="hpc"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path
      d="M21.97 15V9C21.97 4 19.97 2 14.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.72 3.25L3.27002 19.7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.0601 18V13"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 15.5H13.5"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 7.5H5.5"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  <svg
    key="tools"
    viewBox="0 0 36.391 36.391"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d="M36.388,17.248c0-2.283-1.853-4.138-4.139-4.14h-1.77l4.179-4.179L30.387,4.66 c-1.614-1.615-4.235-1.615-5.853,0l-1.25,1.251v-5.91h-6.036c-2.285,0-4.14,1.854-4.14,4.14v1.775L8.927,1.733L4.659,6.002 c-1.616,1.616-1.616,4.236,0,5.854l1.256,1.254H0l0.002,6.037C0,21.433,1.855,23.286,4.14,23.284h1.773l-4.18,4.182l4.27,4.269 c1.615,1.616,4.236,1.616,5.852,0l1.254-1.256v5.911h6.037c2.284,0,4.139-1.853,4.139-4.139V30.48l4.181,4.18l4.268-4.268 c1.615-1.617,1.615-4.238-0.002-5.856l-1.253-1.253h5.912L36.388,17.248z M18.198,25.697c-4.143,0-7.502-3.358-7.502-7.502 c0-4.143,3.359-7.501,7.502-7.501s7.501,3.358,7.501,7.501C25.699,22.339,22.341,25.697,18.198,25.697z" />
  </svg>,
  <svg
    key="projects"
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d="M2,9H9V2H2ZM4,4H7V7H4Zm7-2V9h7V2Zm5,5H13V4h3ZM2,18H9V11H2Zm2-5H7v3H4Zm7,5h7V11H11Zm2-5h3v3H13Z" />
  </svg>,
];

export default function DataPlatformView({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.solutions.dataPlatform;

  return (
    <div>
      <section className="band-dark pt-36 pb-16 lg:pt-[190px] lg:pb-24">
        <div className="page-width">
          <h1 className="display-lg max-w-[1000px] text-white">{t.title}</h1>
          <p className="mt-6 max-w-[820px] text-base leading-relaxed text-white sm:text-lg">
            {t.subtitle}
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-width">
          <div className="rule-accent max-w-[900px]">
            <p className="text-ink text-base leading-relaxed">{t.intro}</p>
          </div>

          <div className="border-line bg-paper-light mt-10 max-w-[900px] border px-6 py-5">
            <p className="text-muted [&_strong]:text-ink text-sm leading-relaxed [&_strong]:font-bold">
              <RichText segments={t.note} locale={locale} />
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad rule-top">
        <div className="page-width">
          <h2 className="display-md text-ink">{t.pricing.title}</h2>

          <div className="border-line bg-line mt-10 grid gap-px border md:grid-cols-3">
            {t.pricing.cards.map((card) => (
              <div
                key={card.title}
                className="bg-paper-light flex flex-col p-8"
              >
                <h3 className="display-md text-ink">{card.title}</h3>

                <p className="font-display text-ink mt-7 text-[40px] leading-none font-bold tracking-[-0.02em]">
                  {card.price}
                </p>
                <p className="micro-label text-muted mt-3">{card.period}</p>

                {"highlight" in card && card.highlight && (
                  <p className="micro-label border-ink bg-ink text-paper-light mt-5 self-start border px-3 py-1.5">
                    {card.highlight}
                  </p>
                )}

                {"note" in card && card.note && (
                  <p className="text-muted mt-4 text-xs leading-relaxed">
                    {card.note}
                  </p>
                )}

                <ul className="border-line mt-8 border-t">
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className="border-line text-muted flex items-baseline gap-3 border-b py-3 text-sm leading-relaxed last:border-b-0"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-ink inline-block h-[6px] w-[6px] shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-line bg-line mt-8 grid gap-px border md:grid-cols-2">
            <div className="bg-paper-light p-6">
              <p className="text-muted [&_strong]:text-ink text-sm leading-relaxed [&_strong]:font-bold">
                <RichText segments={t.pricing.trialNote} locale={locale} />
              </p>
            </div>
            <div className="bg-paper-light p-6">
              <p className="text-muted [&_strong]:text-ink text-sm leading-relaxed [&_strong]:font-bold">
                <RichText segments={t.pricing.localNote} locale={locale} />
              </p>
            </div>
          </div>

          {t.pricing.estimates.map((estimate) => (
            <div
              key={estimate.title}
              className="border-line bg-paper-light mt-12 border"
            >
              <div className="border-line border-b px-6 py-5 sm:px-8">
                <h3 className="display-md text-ink">{estimate.title}</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-paper">
                      <th className="micro-label border-line text-muted border-b px-6 py-4 sm:px-8">
                        {estimate.columns.item}
                      </th>
                      <th className="micro-label border-line text-muted border-b px-6 py-4 text-right">
                        {estimate.columns.unitPrice}
                      </th>
                      <th className="micro-label border-line text-muted border-b px-6 py-4 text-right">
                        {estimate.columns.qty}
                      </th>
                      <th className="micro-label border-line text-muted border-b px-6 py-4 text-right sm:pr-8">
                        {estimate.columns.subtotal}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimate.rows.map((row, index) => (
                      <tr key={index} className="border-line border-b">
                        <td className="text-ink px-6 py-4 sm:px-8">
                          {row.item}
                        </td>
                        <td className="text-muted px-6 py-4 text-right">
                          {row.unitPrice}
                        </td>
                        <td className="text-muted px-6 py-4 text-right">
                          {row.qty}
                        </td>
                        <td className="text-ink px-6 py-4 text-right font-medium sm:pr-8">
                          {row.subtotal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-paper">
                      <td
                        className="micro-label text-ink px-6 py-4 sm:px-8"
                        colSpan={3}
                      >
                        {estimate.totalLabel}
                      </td>
                      <td className="font-display text-ink px-6 py-4 text-right text-xl font-bold sm:pr-8">
                        {estimate.total}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <p className="border-line text-muted border-t px-6 py-4 text-xs leading-relaxed sm:px-8">
                <RichText segments={estimate.footnote} locale={locale} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad rule-top">
        <div className="page-width">
          <h2 className="display-md text-ink">{t.features.title}</h2>

          <div className="border-line bg-line mt-10 grid gap-px border md:grid-cols-2">
            {t.features.items.map((item, index) => (
              <div key={item.title} className="bg-paper-light p-8">
                <div className="border-ink bg-ink text-paper-light mb-6 flex h-12 w-12 items-center justify-center border">
                  {featureIcons[index]}
                </div>
                <h3 className="display-md text-ink mb-4">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad rule-top">
        <div className="page-width">
          <h2 className="display-md text-ink">{t.gettingStarted.title}</h2>

          <ol className="border-line mt-10 border-t">
            {t.gettingStarted.steps.map((step, index) => (
              <li
                key={index}
                className="border-line flex items-baseline gap-6 border-b py-5"
              >
                <span className="micro-label text-muted w-8 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-ink text-base leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div className="border-line mt-10 border">
            <div className="relative aspect-video">
              <iframe
                width="1840"
                height="1035"
                src="https://www.youtube.com/embed/j8-HmT1JTCw"
                title={t.gettingStarted.videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad rule-top">
        <div className="page-width">
          <h2 className="display-md text-ink">{t.useCases.title}</h2>

          <div className="border-line bg-line mt-10 grid gap-px border md:grid-cols-3">
            {t.useCases.items.map((item) => (
              <div key={item.title} className="bg-paper-light p-8">
                <h3 className="display-md text-ink mb-4">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact dict={dict} fullHeight={false} />
    </div>
  );
}
