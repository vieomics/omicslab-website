import Contact from "@/components/Contact";
import RichText from "@/components/Common/RichText";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";

export default function DataPlatformView({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.solutions.dataPlatform;

  return (
    <div className="container mt-16 py-20">
      <h1 className="mb-8 text-4xl font-bold">{t.title}</h1>
      <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
        {t.subtitle}
      </p>

      <div className="border-primary mb-12 border-l-4 bg-gray-50 p-6 dark:bg-gray-800">
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          {t.intro}
        </p>
      </div>

      <div className="mb-12 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <RichText segments={t.note} locale={locale} />
        </p>
      </div>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">{t.pricing.title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {t.pricing.cards.map((card) => (
            <div key={card.title} className="rounded-lg border p-6 text-center">
              <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>
              <p className="text-primary mb-4 text-3xl font-bold">
                {card.price}
              </p>
              <p className="mb-4 text-sm text-gray-500">{card.period}</p>
              {"highlight" in card && card.highlight && (
                <p className="mb-4 text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                  {card.highlight}
                </p>
              )}
              {"note" in card && card.note && (
                <p className="mb-4 text-xs text-gray-400">{card.note}</p>
              )}
              <ul className="mb-6 space-y-2 text-left text-sm text-gray-600 dark:text-gray-400">
                {card.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <RichText segments={t.pricing.trialNote} locale={locale} />
          </p>
        </div>
        <div className="mt-4 rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <RichText segments={t.pricing.localNote} locale={locale} />
          </p>
        </div>

        {t.pricing.estimates.map((estimate) => (
          <div
            key={estimate.title}
            className="mt-6 rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20"
          >
            <h3 className="mb-4 text-xl font-semibold text-green-800 dark:text-green-200">
              {estimate.title}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
                <thead>
                  <tr className="border-b border-green-200 dark:border-green-800">
                    <th className="pb-2 font-semibold">
                      {estimate.columns.item}
                    </th>
                    <th className="pb-2 font-semibold">
                      {estimate.columns.unitPrice}
                    </th>
                    <th className="pb-2 font-semibold">
                      {estimate.columns.qty}
                    </th>
                    <th className="pb-2 font-semibold">
                      {estimate.columns.subtotal}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {estimate.rows.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-green-100 dark:border-green-800/50"
                    >
                      <td className="py-2">{row.item}</td>
                      <td className="py-2">{row.unitPrice}</td>
                      <td className="py-2">{row.qty}</td>
                      <td className="py-2 font-medium">{row.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-green-300 dark:border-green-700">
                    <td className="pt-3 font-bold" colSpan={3}>
                      {estimate.totalLabel}
                    </td>
                    <td className="pt-3 font-bold text-green-700 dark:text-green-300">
                      {estimate.total}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              <RichText segments={estimate.footnote} locale={locale} />
            </p>
          </div>
        ))}
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">{t.features.title}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                <svg
                  fill="#000000"
                  viewBox="0 0 35 35"
                  data-name="Layer 2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M30.559,13.4H4.441A4.2,4.2,0,0,1,.25,9.206V4.441A4.2,4.2,0,0,1,4.441.25H30.559A4.2,4.2,0,0,1,34.75,4.441V9.206A4.2,4.2,0,0,1,30.559,13.4ZM4.441,2.75A1.693,1.693,0,0,0,2.75,4.441V9.206A1.693,1.693,0,0,0,4.441,10.9H30.559a1.693,1.693,0,0,0,1.691-1.69V4.441A1.693,1.693,0,0,0,30.559,2.75Z"></path>
                  <path d="M8.174,8.9a1.25,1.25,0,0,1-1.25-1.25v-2a1.25,1.25,0,0,1,2.5,0v2A1.25,1.25,0,0,1,8.174,8.9Z"></path>
                  <path d="M27.067,8.323a1.5,1.5,0,0,0,0-3,1.5,1.5,0,0,0,0,3Z"></path>
                  <path d="M22.067,8.323a1.5,1.5,0,0,0,0-3,1.5,1.5,0,0,0,0,3Z"></path>
                  <path d="M30.559,24.074H4.441A4.2,4.2,0,0,1,.25,19.882V15.118a4.2,4.2,0,0,1,4.191-4.191H30.559a4.2,4.2,0,0,1,4.191,4.191v4.764A4.2,4.2,0,0,1,30.559,24.074ZM4.441,13.427A1.693,1.693,0,0,0,2.75,15.118v4.764a1.694,1.694,0,0,0,1.691,1.692H30.559a1.694,1.694,0,0,0,1.691-1.692V15.118a1.693,1.693,0,0,0-1.691-1.691Z"></path>
                  <path d="M8.174,19.577a1.25,1.25,0,0,1-1.25-1.25v-2a1.25,1.25,0,1,1,2.5,0v2A1.25,1.25,0,0,1,8.174,19.577Z"></path>
                  <path d="M30.559,34.75H4.441A4.2,4.2,0,0,1,.25,30.559V25.794A4.2,4.2,0,0,1,4.441,21.6H30.559a4.2,4.2,0,0,1,4.191,4.19v4.765A4.2,4.2,0,0,1,30.559,34.75ZM4.441,24.1a1.693,1.693,0,0,0-1.691,1.69v4.765A1.693,1.693,0,0,0,4.441,32.25H30.559a1.693,1.693,0,0,0,1.691-1.691V25.794a1.693,1.693,0,0,0-1.691-1.69Z"></path>
                  <path d="M8.174,30.253A1.25,1.25,0,0,1,6.924,29V27a1.25,1.25,0,0,1,2.5,0v2A1.249,1.249,0,0,1,8.174,30.253Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">{t.features.items[0].title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t.features.items[0].paragraph}
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.97 15V9C21.97 4 19.97 2 14.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M19.72 3.25L3.27002 19.7"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M16.0601 18V13"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M18.5 15.5H13.5"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M10.5 7.5H5.5"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">{t.features.items[1].title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t.features.items[1].paragraph}
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
                <svg
                  height="200px"
                  width="200px"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36.391 36.391"
                  fill="#000000"
                >
                  <g>
                    <path d="M36.388,17.248c0-2.283-1.853-4.138-4.139-4.14h-1.77l4.179-4.179L30.387,4.66 c-1.614-1.615-4.235-1.615-5.853,0l-1.25,1.251v-5.91h-6.036c-2.285,0-4.14,1.854-4.14,4.14v1.775L8.927,1.733L4.659,6.002 c-1.616,1.616-1.616,4.236,0,5.854l1.256,1.254H0l0.002,6.037C0,21.433,1.855,23.286,4.14,23.284h1.773l-4.18,4.182l4.27,4.269 c1.615,1.616,4.236,1.616,5.852,0l1.254-1.256v5.911h6.037c2.284,0,4.139-1.853,4.139-4.139V30.48l4.181,4.18l4.268-4.268 c1.615-1.617,1.615-4.238-0.002-5.856l-1.253-1.253h5.912L36.388,17.248z M18.198,25.697c-4.143,0-7.502-3.358-7.502-7.502 c0-4.143,3.359-7.501,7.502-7.501s7.501,3.358,7.501,7.501C25.699,22.339,22.341,25.697,18.198,25.697z"></path>
                  </g>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">{t.features.items[2].title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t.features.items[2].paragraph}
            </p>
          </div>
          <div className="rounded-lg bg-orange-50 p-6 dark:bg-orange-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                <svg
                  fill="#000000"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="M2,9H9V2H2ZM4,4H7V7H4Zm7-2V9h7V2Zm5,5H13V4h3ZM2,18H9V11H2Zm2-5H7v3H4Zm7,5h7V11H11Zm2-5h3v3H13Z"></path>
                  </g>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">{t.features.items[3].title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t.features.items[3].paragraph}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">
          {t.gettingStarted.title}
        </h2>
        <div className="mb-8 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
          <ol className="list-inside list-decimal space-y-3">
            {t.gettingStarted.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <div
            style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              width="1840"
              height="1035"
              src="https://www.youtube.com/embed/j8-HmT1JTCw"
              title={t.gettingStarted.videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">{t.useCases.title}</h2>
        <div className="space-y-4">
          {t.useCases.items.map((item) => (
            <div key={item.title} className="rounded-lg border p-6">
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.paragraph}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Contact dict={dict} fullHeight={false} />
    </div>
  );
}
