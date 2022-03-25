import Image from 'next/image';

export default function Logo() {
    return <div style={{position: "relative", width: "5rem", height: "3rem"}}>
        <Image
            alt="a dog sitting at the end of a curvy path"
            src={'/logo.png'}
            layout="fill"
            objectFit="contain"
        />
    </div>;
}
