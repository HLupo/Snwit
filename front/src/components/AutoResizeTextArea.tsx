import { forwardRef } from 'react';
import ResizeTextarea from "react-textarea-autosize";
import { Textarea, TextareaProps } from '@chakra-ui/textarea'

export const AutoResizeTextArea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
    return (
        <Textarea
            minH={"unset"}
            overflow={"hidden"}
            w={"100%"}
            resize={"none"}
            ref={ref}
            minRows={2}
            as={ResizeTextarea}
            {...props}
        />
    );
});

AutoResizeTextArea.displayName = "AutoResizeTextarea";

export default AutoResizeTextArea