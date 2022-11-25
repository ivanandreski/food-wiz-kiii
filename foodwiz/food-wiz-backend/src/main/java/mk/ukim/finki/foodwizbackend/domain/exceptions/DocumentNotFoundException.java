package mk.ukim.finki.foodwizbackend.domain.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // 409
public class DocumentNotFoundException extends RuntimeException{
    public DocumentNotFoundException(long id){
        super("Document " + id + " does not exist.");
    }
}
