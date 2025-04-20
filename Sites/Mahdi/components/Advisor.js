import React from 'react';

const TestimonialCard = ({ testimonial, name, title, image }) => (
    <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center space-y-4 transition-transform duration-200 hover:scale-105 max-w-[41rem]">
        <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />
        <blockquote className="text-lg tracking-tight text-slate-900 dark:text-gray-300">
            {testimonial}
        </blockquote>
        <figcaption className="mt-4">
            <div className="font-semibold text-slate-900 dark:text-gray-100">{name}</div>
            <div className="text-sm text-slate-500 dark:text-gray-400">{title}</div>
        </figcaption>
    </div>
);

const Advisor = () => {
    const testimonials = [
        {
            testimonial: "Empowering the community through science and innovation is not just a passion; it’s a commitment to building a brighter future for all.",
            name: <a href="https://www.salmanpromon.com/" target="_blank" rel="noopener noreferrer"><u>SALMAN</u> <u>PROMON</u></a>,
            title: "Founder, Mechamind | Lecturer, Independent University, Bangladesh",
            image: "https://res.cloudinary.com/dnvmjyiml/image/upload/v1730203477/salman.jpg"
        },
    ];

    const mentor = [
        {
            testimonial: "Failure is the opportunity to begin again more intelligently.",
            name: "MEHEDI HASSAN",
            title: "Former Vice President, DUET Robotics Club | BSc in Mechanical Engineering DUET, Bangladesh",
            image: "https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/869e809c-fe74-49e4-98a7-41063d82e114.png"
        },
        {
            testimonial: "In every line of code, there lies the potential to change the world; my journey in tech is a testament to that.",
            name: "MD SABBIR AL SHAFI",
            title: "BSc in CSE, Varendra University, Bangladesh",
            image: "https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/39176093-a0f4-4823-87c1-772cb5341a8c.png"
        },
    ];

    return (
        <section id="testimonials" aria-label="What our customers are saying" className="py-20 sm:py-32">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">Our Mentors</h2>
                </div>
                <div data-aos="fade-up" className="flex justify-center">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                        {mentor.map((mentor, index) => (
                            <TestimonialCard key={index} {...mentor} />
                        ))}
                    </div>
                </div>
                <div className="text-center mt-20 mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">Our Advisors</h2>
                </div>
                <div data-aos="fade-up" className="flex justify-center">
                    <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={index} {...testimonial} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Advisor;
