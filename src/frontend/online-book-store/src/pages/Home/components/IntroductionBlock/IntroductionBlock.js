import IntroductionItem from '../IntroductionItem';
import config from '~/config';

function IntroductionBlock() {
    const data = [
        {
            image: 'https://media.licdn.com/dms/image/C4D12AQGIqLOZ33rVJw/article-cover_image-shrink_720_1280/0/1520245131645?e=2147483647&v=beta&t=rZsH11VNYR8KypWpbE-fSH_rC9jzrWaEl28g5Tm6QB4',
            alt: '',
            title: 'Books',
            paragraph:
                'Fantasy, Fiction, Education, Self-Help, Science, Romance, Healing , Classics, Poetry, Plays, Rare Books, History.',
            to: config.routes.shopbooks,
        },
        {
            image: 'https://www.artnews.com/wp-content/uploads/2022/09/GettyImages-1241066216.jpg?w=1200',
            alt: '',
            title: 'Hi, We are SIBOOKS',
            paragraph:
                "SIBOOKS allows you to explore over new and second-hand books across various genres, including new releases, classics, kids' books, young adult novels,...",
            video: '-wloHUp86EU',
            to: config.routes.about,
        },
    ];

    return data.map((item, index) => (
        <IntroductionItem
            image={item.image}
            alt={item.alt}
            title={item.title}
            paragraph={item.paragraph}
            video={item.video}
            to={item.to}
            key={index}
        />
    ));
}

export default IntroductionBlock;
