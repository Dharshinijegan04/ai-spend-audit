import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function PublicResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  // FIXED
  const { id } = await params;

  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  console.log(data);
  console.log(error);

  if (error || !data) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-5xl font-bold">
          Report Not Found
        </h1>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-3xl p-10">

        <h1 className="text-5xl font-bold">
          Shared AI Audit Report
        </h1>

        <p className="text-gray-400 mt-4">
          Public savings report generated with AI Spend Audit.
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">

          {/* CURRENT */}
          <div className="bg-black border border-gray-700 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Current Setup
            </h2>

            <div className="space-y-4 text-lg">

              <p>
                Tool:
                <span className="text-blue-400 ml-2">
                  {data.tool}
                </span>
              </p>

              <p>
                Current Plan:
                <span className="text-red-400 ml-2">
                  {data.plan}
                </span>
              </p>

              <p>
                Monthly Spend:
                <span className="text-yellow-400 ml-2">
                  ${data.spend}
                </span>
              </p>

              <p>
                Team Size:
                <span className="text-purple-400 ml-2">
                  {data.team_size}
                </span>
              </p>

            </div>

          </div>

          {/* SAVINGS */}
          <div className="bg-black border border-gray-700 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Optimization
            </h2>

            <div className="space-y-4 text-lg">

              <p>
                Recommended Plan:
                <span className="text-green-400 ml-2">
                  {data.recommended_plan}
                </span>
              </p>

              <p>
                Recommended Spend:
                <span className="text-green-400 ml-2">
                  ${data.recommended_spend}
                </span>
              </p>

              <p>
                Monthly Savings:
                <span className="text-green-500 ml-2 font-bold">
                  ${data.monthly_savings}
                </span>
              </p>

              <p>
                Yearly Savings:
                <span className="text-green-500 ml-2 font-bold">
                  ${data.yearly_savings}
                </span>
              </p>

            </div>

          </div>

        </div>

        {/* RECOMMENDATION */}
        <div className="mt-10 bg-black border border-gray-700 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Recommendation
          </h2>

          <p className="text-gray-300 leading-8 text-lg">
            {data.reason}
          </p>

        </div>

      </div>

    </main>
  );
}