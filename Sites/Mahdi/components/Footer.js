import Link from "next/link";

export default function Footer() {
    return <>
        <div className="footer">
            <div className="container flex flex-sb flex-wrap flex-left">
                <div className="footer_logo" data-aos="fade-right">
                    <h2>RoboSuperior</h2>
                    <h4>&copy; 2024 ALL Rights Reserved.</h4>
                    <h3>Developed By <Link href="https://linkedin.com/in/06nurahmed" target="_blank"><span>@Nur Ahmad</span></Link></h3>
                </div>
                <div className="q_links" data-aos="fade-up">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link href='/'>Affiliate Partnership</Link></li>
                        <li><Link href='/about'>About Us</Link></li>
                        <li><Link href='/contact'>Contact Us</Link></li>
                    </ul>
                </div>
                <div className="q_links" data-aos="fade-up">
                    <h3>Legal Stuff Links</h3>
                    <ul>
                        <li><Link href='/'>Privacy Notice</Link></li>
                        <li><Link href='/'>Cookie Policy</Link></li>
                        <li><Link href='/'>Terms Of Use</Link></li>
                    </ul>
                </div>
                <div className="q_links" data-aos="fade-left">
                    <h3>Social Media</h3>
                    <ul>
                        <li><Link href='https://github.com/nurahmed123' target="_blank">Github</Link></li>
                        <li><Link href='https://x.com/robo_superior' target="_blank">Twitter</Link></li>
                        <li><Link href='https://www.instagram.com/robo__superior/' target="_blank">Instagram</Link></li>
                        <li><Link href='https://www.facebook.com/robosuperior' target="_blank">Facebook</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </>
}