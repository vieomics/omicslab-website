import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;

  const ratingIcons = [];
  for (let index = 0; index < star; index++) {
    ratingIcons.push(
      <span key={index} className="text-ink">
        {starIcon}
      </span>,
    );
  }

  return (
    <figure className="bg-paper-light flex h-full flex-col p-8">
      <div className="mb-8 flex items-center gap-[3px]">{ratingIcons}</div>

      <blockquote className="text-ink flex-1 text-base leading-relaxed">
        “{content}
      </blockquote>

      <figcaption className="border-line mt-8 flex items-center gap-4 border-t pt-6">
        <div className="border-line relative h-[50px] w-[50px] shrink-0 overflow-hidden border">
          <Image
            src={image}
            alt={name}
            fill
            sizes="50px"
            className="object-cover"
          />
        </div>

        <div>
          <p className="micro-label text-ink">{name}</p>
          <p className="micro-label text-muted mt-1">{designation}</p>
        </div>
      </figcaption>
    </figure>
  );
};

export default SingleTestimonial;
