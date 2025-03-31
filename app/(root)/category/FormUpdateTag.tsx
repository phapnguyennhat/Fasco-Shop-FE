import { updateTag } from '@/API/tag/action';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { isErrorResponse } from '@/lib/utils';
import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useState,
} from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoCheckmark } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

interface IProps {
    tag: ITag;
    setOpenEdit: Dispatch<SetStateAction<boolean>>;
}
export default function FormUpdateTag({ tag, setOpenEdit }: IProps) {
    const [name, setName] = useState(tag.name);
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const { toast } = useToast();
    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name === '') {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong',
                description: 'Name is required',
            });
            return;
        }

        dispatch(setSpinner(true));
        const response = await updateTag(tag.id, name);
        if (isErrorResponse(response)) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: response.message,
            });
        } else {
            toast({
                description: 'Update Category successfully.',
            });
            setOpenEdit(false);
        }
        dispatch(setSpinner(false));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className=" gap-2 inline-flex items-center"
        >
            <Input
                className=" w-[70%]"
                value={name}
                onChange={onChangeName}
                type="text"
            />
            <div className="gap-1 items-center hidden lg:inline-flex">
                <button type="submit">
                    <IoCheckmark />
                </button>
                <button onClick={() => setOpenEdit(false)} type="button">
                    <IoMdClose />
                </button>
            </div>
        </form>
    );
}
