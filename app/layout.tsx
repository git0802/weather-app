import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Get instant weather updates and forecasts for any location.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const am = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const currentStatus = Number(new Date().getHours().toFixed());

  return (
    <html
      lang="en"
      className={`bg-${
        currentStatus >= 0 && currentStatus <= 12 ? "black" : "black"
      }`}
    >
<head>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7051464837195925"
     crossorigin="anonymous"></script>
		 <!-- Google tag (gtag.js) -->
		 <script async src="https://www.googletagmanager.com/gtag/js?id=G-G6SC9GX5RB"></script>
		 <script>
			  window.dataLayer = window.dataLayer || [];
			  function gtag(){dataLayer.push(arguments);}
			  gtag('js', new Date());
			  gtag('config', 'G-G6SC9GX5RB');

			  // Uncomment and use this line if you need to configure Google Ads
			  gtag('config', 'AW-11415100394');
		 </script>

	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-3LTJ6P6R4Q"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	  gtag('config', 'G-3LTJ6P6R4Q');
	</script>


	<!-- Event snippet for Page view conversion page -->
	<script>
		 gtag('event', 'conversion', {'send_to': 'AW-11415100394/EjTECMSQzfcYEOq3ksMq'});
	</script>


	<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7051464837195925"
		  crossorigin="anonymous"></script>

	<!-- Twitter conversion tracking base code -->
	<script>
	!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
	},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
	a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
	twq('config','ohg64');
	</script>
	<!-- End Twitter conversion tracking base code -->

	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-T8QXCC9J');</script>
	<!-- End Google Tag Manager -->


</head>
      
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
