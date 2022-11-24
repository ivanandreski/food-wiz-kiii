package mk.ukim.finki.foodwizbackend.repository;

import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;
import mk.ukim.finki.foodwizbackend.domain.models.DatasetTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatasetTagRepository extends JpaRepository<DatasetTag, Long> {

    DatasetTag findByTagId(String tagId);
}
