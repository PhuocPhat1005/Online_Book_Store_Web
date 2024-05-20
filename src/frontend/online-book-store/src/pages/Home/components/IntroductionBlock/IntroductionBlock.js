import IntroductionItem from '../IntroductionItem';

function IntroductionBlock() {
    const data = [
        {
            image: 'https://media.licdn.com/dms/image/C4D12AQGIqLOZ33rVJw/article-cover_image-shrink_720_1280/0/1520245131645?e=2147483647&v=beta&t=rZsH11VNYR8KypWpbE-fSH_rC9jzrWaEl28g5Tm6QB4',
            alt: '',
            title: 'Books',
            paragraph:
                'Fantasy, Fiction, Education, Self-Help, Science, Romance, Healing , Classics, Poetry, Plays, Rare Books, History.',
        },
        {
            image: 'https://www.artnews.com/wp-content/uploads/2022/09/GettyImages-1241066216.jpg?w=1200',
            alt: '',
            title: 'Pre-Orders',
            paragraph:
                'Want to pre-order a hotly anticipated title? Check out our Pre-Orders page for a selection of upcoming books.',
        },
    ];

    return data.map((item, index) => (
        <IntroductionItem image={item.image} alt={item.alt} title={item.title} paragraph={item.paragraph} key={index} />
    ));
}

export default IntroductionBlock;
