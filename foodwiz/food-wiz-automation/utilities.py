class Utilities:
    @staticmethod
    def serialize_list(list):
        if list is None:
            return None
        result = []
        for element in list:
            result.append(element.serialized)

        return result
