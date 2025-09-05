import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import Image from "next/image";
import { supabase } from "@/app/lib/supabaseClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { data } = await supabase.from("blogs").select("id");
  return (data || []).map((blog) => ({ params: { id: blog.id.toString() } }));
}

export default async function BlogDetailsPage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("blogs")
    .select("id, title, content, author, image_url, tags, created_at")
    .eq("id", params.id)
    .single();

  if (error || !data) return notFound();

  return (
    <section className="pt-[150px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div>
              <h2 className="mb-8 text-3xl leading-tight font-bold text-black sm:text-4xl sm:leading-tight dark:text-white">
                {data.title}
              </h2>
              <div className="border-body-color/10 mb-10 flex flex-wrap items-center justify-between border-b pb-4 dark:border-white/10">
                <div className="flex flex-wrap items-center">
                  <div className="mr-10 mb-5 flex items-center">
                    <div className="mr-4">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image src={"/images/blog/author-01.png"} alt="author" fill />
                      </div>
                    </div>
                    <div className="w-full">
                      <span className="text-body-color mb-1 text-base font-medium">
                        By <span>{data.author}</span>
                      </span>
                    </div>
                  </div>
                  <div className="mb-5 flex items-center">
                    <p className="text-body-color mr-5 flex items-center text-base font-medium">
                      <span className="mr-3">🗓️</span>
                      {new Date(data.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mb-5">
                  {Array.isArray(data.tags)
                    ? data.tags.map((tag: string) => <TagButton key={tag} text={tag} />)
                    : data.tags && <TagButton text={data.tags} />}
                </div>
              </div>
              <div className="mb-10 w-full overflow-hidden rounded-sm">
                <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                  <Image
                    src={data.image_url || "/images/blog/blog-details-01.jpg"}
                    alt={data.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <p className="text-body-color mb-10 text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                {data.content}
              </p>
              <SharePost />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
