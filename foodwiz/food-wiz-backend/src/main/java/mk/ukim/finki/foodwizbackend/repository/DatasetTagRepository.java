package mk.ukim.finki.foodwizbackend.repository;

import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;
import mk.ukim.finki.foodwizbackend.domain.models.Dataset;
import mk.ukim.finki.foodwizbackend.domain.models.DatasetTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DatasetTagRepository extends JpaRepository<DatasetTag, Long> {

    Optional<DatasetTag> findByTagId(String tagId);

    @Query(value = "select dt.*" +
            " from dataset_tags dt" +
            " where dt.dataset_id = :dataset_id", nativeQuery = true)
    List<DatasetTag> getDatasetTagsByDatasetId(@Param("dataset_id") Long datasetId);
}
