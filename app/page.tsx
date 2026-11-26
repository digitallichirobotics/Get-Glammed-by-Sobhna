'use client';
import {useEffect, useRef, useState, type FormEvent} from 'react';
import {Flower2, Search, ShoppingBag, Menu, CalendarDays, MapPin, Clock, ShieldCheck, Heart, Sparkles, Headphones, Gift, Users, ArrowRight, X, CheckCircle2, Star} from 'lucide-react';
import {motion} from 'framer-motion';
const salonAddress = 'VIP Rd, behind Pride Ananya Resort, Puri, Odisha 752002';
const salonPhone = '06370642781';
const salonPhoneInternational = '+916370642781';
const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(salonAddress);

const galleryPhotos = [
  ['Image-32445.jpg', 'Bride in an ivory outfit with a swept-back hairstyle', 1440, 1919],
  ['unnamed (1).webp', 'Woman in an embellished outfit with loose waves', 680, 1020],
  ['unnamed (2).webp', 'Close-up of pink bridal makeup and jewellery', 680, 1020],
  ['unnamed (3).webp', 'Woman in an ivory gown with formal makeup and styling', 604, 804],
  ['unnamed.jpg', 'Bride in a red veil with traditional jewellery', 243, 406],
  ['unnamed.webp', 'Bridal bun decorated with white and pink flowers', 765, 1020],
] as const;

const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? salonPhoneInternational).trim().replace(/[+ ()-]/g, '');
const whatsappUrl = /^[1-9][0-9]{6,14}$/.test(whatsappNumber) ? 'https://wa.me/' + whatsappNumber : '';
const whatsappLink = (message: string) => whatsappUrl + '?text=' + encodeURIComponent(message);

const services=[['salon-service-facial','Hydra Facial','Deep cleansing & glow boost','59','Bestseller'],['service-hair','Hair Spa & Treatment','Nourish, repair & shine','49','Popular'],['service-bridal','Bridal Makeup','Flawless beauty for your special day','199','Trending'],['service-cut','Haircut & Styling','Trendy cuts & expert styling','39','New'],
  ['salon-service-manicure','Manicure','Nail shaping, cuticle care and polish','',''],
  ['salon-service-pedicure','Pedicure','Foot and toenail care with a polished finish','',''],
  ['salon-service-threading','Eyebrow Threading','Define and tidy your natural brow shape','',''],
  ['salon-service-massage','Back Massage','A relaxing massage for the back and shoulders','',''],
  ['salon-service-color','Hair Coloring','Refresh your shade or try something new','',''],
];
const packages=[['salon-service-facial','Glow & Radiance Package','Facial · Cleanup · Massage','89',''],['service-hair','Hair Care Package','Hair Spa · Haircut · Styling','79',''],['package-bridal-portrait','Bridal Beauty Package','Makeup · Hair · Nail Art','249','Bestseller'],['salon-service-massage','Wellness Package','Body Spa · Massage · Facial','129','']];
const products=[['product-serum','Vitamin C Serum','Brightening & Glow','24','Sale'],['product-shampoo','Keratin Shampoo','Smooth & Repair','18','Sale'],['product-lipstick','Matte Lipstick','Long Lasting','16','Sale'],['product-cream','Moisturizer Cream','Deep Hydration','22','Sale']];
const perks=[['Certified Experts','Trained professionals'],['Premium Products','Quality focused'],['Personalized Care','Tailored just for you'],['Hygienic & Safe','Your safety is our priority']];
const icons=[Users,ShoppingBag,Heart,ShieldCheck];
function SalonVideos() {
  const gallery = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videos = gallery.current?.querySelectorAll('video');
    if (!videos) return;

    function startVideo(video: HTMLVideoElement) {
      video.muted = true;
      void video.play().catch(() => {
        // Keep the native play control available if autoplay is blocked.
      });
    }

    if (!('IntersectionObserver' in window)) {
      videos.forEach(startVideo);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const video = entry.target as HTMLVideoElement;
        observer.unobserve(video);
        if (video.paused && video.currentTime === 0) startVideo(video);
      }
    }, { threshold: 0.25 });

    videos.forEach(video => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="videos" aria-labelledby="videos-heading">
      <div className="sectionhead"><h2 id="videos-heading">Videos</h2></div>
      <div className="video-gallery" ref={gallery}>
        {['Video-12046.mp4', 'Video-20457.mp4', 'Video-46267.mp4', 'Video-59678.mp4'].map((file, index) => (
          <video key={file} controls muted loop playsInline preload="metadata" aria-label={'Salon video ' + (index + 1)}>
            <source src={'/images/VIDEO/' + file} type="video/mp4" />
            <a href={'/images/VIDEO/' + file}>Open video</a>
          </video>
        ))}
      </div>
    </section>
  );
}

export default function Home(){const [showAllServices,setShowAllServices]=useState(false); const [menu,setMenu]=useState(false),[search,setSearch]=useState(''),[searchOpen,setSearchOpen]=useState(false),[cart,setCart]=useState<string[]>([]),[modal,setModal]=useState(''),[service,setService]=useState(''),[date,setDate]=useState(''),[time,setTime]=useState(''),[submitted,setSubmitted]=useState(false); const book=(s='')=>{setService(s);setSubmitted(false);setModal('booking')}; const filter=(items:string[][])=>items.filter(x=>x.join(' ').toLowerCase().includes(search.toLowerCase()));
const cards=(items:string[][],kind:string)=><div className="cards">{filter(items).map(([img,name,desc,price,badge])=><motion.article whileHover={{y:-5}} className="item" key={name}><div className="photo"><img src={'/images/'+img+'.webp'} alt={name}/>{badge&&<span className={'tag '+badge.toLowerCase()}>{badge}</span>}</div><div className="itembody"><h3>{name}</h3><p>{desc}</p>{kind==='service'&&<small className="muted">Professional beauty care</small>}<div className="price"><strong>{price ? (kind==='service' ? 'From ' : '') + '$' + price : 'Ask for pricing'}</strong><button aria-label={kind==='product'?'Add '+name+' to bag':'Book '+name} onClick={()=>kind==='product'?setCart([...cart,name]):book(name)}>{kind==='product'?<ShoppingBag size={16}/>:<ArrowRight size={17}/>}</button></div></div></motion.article>)}</div>;
const heading=(name:string,action?:()=>void)=><div className="sectionhead"><h2>{name}</h2>{action&&<button className="link" onClick={action}>View All <ArrowRight size={13}/></button>}</div>;
function sendBooking(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (!whatsappUrl) {
    setSubmitted(true);
    return;
  }
  const details = new FormData(event.currentTarget);
  const message = [
    'Hi Get Glammed by Sobhna! I would like to request an appointment.',
    '',
    'Name: ' + details.get('name'),
    'Phone: ' + details.get('phone'),
    'Service: ' + service,
    'Preferred date: ' + date,
    'Preferred time: ' + time,
  ].join('\n');
  window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
}

return <><header><a href="#home" className="brand"><img className="brand-mark" src="/images/get-glammed-logo.png" width={42} height={42} alt="" /><span>Get Glammed <small>BY SOBHNA · BEAUTY & CARE</small></span></a><nav className={menu?'open':''}>{['Home','Services','Shop','Packages','Gallery','About Us'].map((n,i)=><a key={n} href={'#'+['home','services','products','packages','gallery','about'][i]} onClick={()=>setMenu(false)}>{n}</a>)}</nav><div className="actions"><button aria-label="Search" onClick={()=>setSearchOpen(!searchOpen)}><Search/></button><button aria-label="Shopping bag" onClick={()=>setModal('bag')}><ShoppingBag/>{cart.length>0&&<sup>{cart.length}</sup>}</button><button aria-label="Menu" onClick={()=>setMenu(!menu)}><Menu/></button></div></header>{searchOpen&&<div className="search"><input autoFocus placeholder="Search services, packages or products" value={search} onChange={e=>setSearch(e.target.value)}/><button onClick={()=>{setSearch('');setSearchOpen(false)}}><X/></button></div>}
<main id="home"><section className="hero"><motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}}><span className="eyebrow">BEAUTY · CONFIDENCE · CARE</span><h1>Reveal Your<br/><em>Natural Beauty</em></h1><p>Premium beauty & personal care services for a more confident you.</p><a className="primary" href="#services">Explore Services <ArrowRight size={17}/></a></motion.div></section><div className="perks">{perks.map(([a,b],i)=>{const Icon=icons[i];return <div key={a}><Icon/><span><b>{a}</b><small>{b}</small></span></div>})}</div>
<section className="booking" aria-labelledby="booking-heading"><h2 id="booking-heading">Book an Appointment</h2><label><Sparkles/> <span>Service<select aria-label="Service" value={service} onChange={e=>setService(e.target.value)}><option value="">Select service</option>{[...services,...packages].map(x=><option key={x[1]}>{x[1]}</option>)}</select></span></label><label><CalendarDays/><span>Date<input aria-label="Preferred date" type="date" value={date} onChange={e=>setDate(e.target.value)}/></span></label><label><Clock/><span>Time<input aria-label="Preferred time" type="time" value={time} onChange={e=>setTime(e.target.value)}/></span></label><button className="primary plum" onClick={()=>book(service)}>Continue <ArrowRight size={16}/></button></section>
<section id="services">
  <div className="sectionhead">
    <h2>Top Services</h2>
    {!search.trim() && <button type="button" className="link" aria-expanded={showAllServices} aria-controls="service-cards" onClick={()=>setShowAllServices(!showAllServices)}>
      {showAllServices ? 'Show Less' : 'View All'} <ArrowRight size={13} aria-hidden="true"/>
    </button>}
  </div>
  <div id="service-cards">{cards(showAllServices || search.trim() ? services : services.slice(0,4),'service')}</div>
</section>
<section id="about" className="about"><div><h2>Why Choose <em>Get Glammed by Sobhna?</em></h2><p>We bring out the best in you with expert care, premium products and personalized attention.</p><div className="mini">{['Expert Professionals','Premium Products','Advanced Techniques','Custom Care for You','Relaxing Environment'].map((x,i)=>{const I=[Users,ShoppingBag,Sparkles,Flower2,Heart][i];return <span key={x}><I/>{x}</span>})}</div><button className="primary" onClick={()=>setModal('About Get Glammed by Sobhna')}>Know More About Us</button></div></section>
<section className="offer"><div><small>Special Offer</small><h2>Glow Like Never Before!</h2><p>Discover beauty offers for your next visit.</p><button className="primary" onClick={()=>book()}>Claim Offer</button></div><span className="offerflower">✿</span></section>
<section>{heading('What Our Clients Say')}<div className="reviews">{['Your beauty experience matters','Personalized attention','Care for every occasion'].map(x=><article key={x}><span>“</span><p>{x}. Client testimonials will appear here after approval.</p><small>Client feedback coming soon</small></article>)}</div></section>
<div className="quick">{[['Book Appointment',CalendarDays],['Find Salon',MapPin],['Special Offers',Gift],['Support',Headphones]].map(([n,I])=>{const Icon=I as typeof CalendarDays;return <button key={String(n)} onClick={()=>String(n)==='Book Appointment'?book():setModal(String(n))}><Icon/><b>{String(n)}</b></button>})}</div>
<SalonVideos />
<section id="packages">{heading('Featured Packages',()=>book())}{cards(packages,'package')}</section><section className="selfcare"><div><h2>Why Self Care Matters</h2><p>Taking care of yourself is more than just a routine – it’s a way of life. Look good, feel confident and be your best self.</p><button className="primary plum" onClick={()=>setModal('Why Self Care Matters')}>Learn More</button></div></section>
<section>{heading('Our Promise')}<div className="mini promise">{['Quality Products','Hygienic & Safe','Trusted Professionals','Customized Care','Client Satisfaction'].map((n,i)=>{const I=[Sparkles,ShieldCheck,Users,Flower2,Heart][i];return <span key={n}><I/>{n}</span>})}</div></section>
<section id="products">{heading('Best Selling Products',()=>{setSearchOpen(true);window.scrollTo({top:0,behavior:'smooth'})})}{cards(products,'product')}</section><section id="gallery">
  {heading('Gallery')}
  <div className="gallery">
    {galleryPhotos.map(([file, description, width, height]) => (
      <figure key={file}>
        <img src={'/images/gallery_img/' + encodeURIComponent(file)} alt={description} loading="lazy" width={width} height={height} />
      </figure>
    ))}
  </div>
</section>
<section className="offer"><div><h2>Beauty Anytime, Anywhere!</h2><p>Find your next beauty experience with Get Glammed by Sobhna.</p><button className="primary" onClick={()=>book()}>Book Appointment</button></div><Flower2 size={100}/></section><div className="perks bottom"><span>♧ Secure Payments (coming soon)</span><span>♡ Premium Care</span><span>✧ Personalized Services</span></div></main><footer><div><a className="brand" href="#home"><img className="brand-mark" src="/images/get-glammed-logo.png" width={42} height={42} alt="" /><span>Get Glammed<small>BY SOBHNA</small></span></a><p>Enhancing your natural beauty with personalized care.</p></div><div><h3>Quick Links</h3>{['services','shop','packages','gallery','videos','about'].map(n=><a key={n} href={n==='shop'?'#products':'#'+n}>{n}</a>)}</div><div><h3>Customer Care</h3><button onClick={()=>book()}>Book Appointment</button><button onClick={()=>setModal('Support')}>Contact & Support</button></div><div><h3>Contact Us</h3><address className="salon-contact">
  <a href={directionsUrl} target="_blank" rel="noopener noreferrer">{salonAddress}</a>
  <a href={'tel:' + salonPhoneInternational}>{salonPhone}</a>
</address>{whatsappUrl ? <a href={whatsappLink('Hi Get Glammed by Sobhna! I have a question.')} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a> : null}</div><small className="copyright">© Get Glammed by Sobhna. All rights reserved.</small></footer>
{whatsappUrl && (
  <a className="whatsapp-chat" href={whatsappLink('Hi Get Glammed by Sobhna! I have a question.')} target="_blank" rel="noopener noreferrer" aria-label="Chat with Get Glammed on WhatsApp">
    <img src="/images/whatsapp.svg" width={20} height={20} alt="" />
    WhatsApp
  </a>
)}
{modal&&<div className="overlay" onClick={()=>setModal('')}><div className="dialog" role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}><button className="close" aria-label="Close" onClick={()=>setModal('')}><X/></button>{modal==='booking'?<><h2>Book an Appointment</h2>{submitted?<p><CheckCircle2/> Your appointment details have been prepared locally. Contact the salon to confirm your booking.</p>:<form onSubmit={sendBooking}><input name="name" required placeholder="Full name" aria-label="Full name" autoComplete="name"/><input name="phone" required type="tel" placeholder="Phone number" aria-label="Phone number" autoComplete="tel"/><select aria-label="Service" required value={service} onChange={e=>setService(e.target.value)}><option value="">Choose service</option>{[...services,...packages].map(x=><option key={x[1]}>{x[1]}</option>)}</select><input aria-label="Preferred date" required type="date" value={date} onChange={e=>setDate(e.target.value)}/><input aria-label="Preferred time" required type="time" value={time} onChange={e=>setTime(e.target.value)}/><button className="primary">{whatsappUrl ? 'Continue to WhatsApp' : 'Prepare Appointment'}</button><small>{whatsappUrl ? 'Review and send your request in WhatsApp. The salon will confirm availability.' : 'The form prepares your details locally.'}</small></form>}</>:(modal==='Find Salon'||modal==='Support')?<><h2>{modal}</h2><address className="salon-contact">
  <a href={directionsUrl} target="_blank" rel="noopener noreferrer">{salonAddress}</a>
  <a href={'tel:' + salonPhoneInternational}>{salonPhone}</a>
</address><a className="primary" href={directionsUrl} target="_blank" rel="noopener noreferrer">Get Directions</a></>:modal==='bag'?<><h2>Your Shopping Bag</h2>{cart.length?cart.map((n,i)=><div className="bagrow" key={i}>{n}<button onClick={()=>setCart(cart.filter((_,j)=>j!==i))}>Remove</button></div>):<p>Your bag is empty.</p>}<p>Online checkout is not connected.</p></>:<><h2>{modal.split('|')[0]}</h2><p>{modal.split('|')[1]||'Explore personalized beauty and care. Contact information and availability will be added by the salon.'}</p><button className="primary" onClick={()=>book()}>Book Appointment</button></>}</div></div>}</>}
