import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import DogProfile from "../../components/dog/dog-profile.component";
import Spinner from "../../components/utils/spinner.component";
import {DogDto} from "../../dto/dogs/dog.dto";
import {useStores} from "../../stores";

const DogPage = observer(function DogPage() {
    const [dog, setDog] = useState<DogDto | null>(null);

    const router = useRouter();
    const dogId = parseInt(router.query?.id as string, 10);

    const {dogsStore} = useStores();

    useEffect(() => {
        if (dogId) {
            dogsStore
                .findOne(dogId)
                .then((dog: DogDto) => setDog(dog));
        }
    }, [dogId, dogsStore]);

    if (dog == null) {
        return <Spinner/>;
    }

    return (
        <>
            <h1>{dog.name}</h1>
            {!dog ? <Spinner/> : <DogProfile dog={dog}/>}
        </>
    );
});

export default DogPage;
