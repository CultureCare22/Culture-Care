from sql_db import Language
def test_language(languages):
    dict = {}
    for i in range(len(languages)):
        language = languages[i]
        practitioners_l = Language.query.filter(Language.name == language).all()
        for practitioner in practitioners_l:
            if i == 0 and i not in dict:
                dict[i] = set()
                dict[i].add(practitioner)

            elif i == 0 and i in dict:
                dict[i].add(practitioner)
                
            elif practitioner in dict[i-1] and i not in dict:
                dict[i] = set()
                dict[i].add(practitioner)
            elif practitioner in dict[i-1] and i in dict:
                dict[i].add(practitioner)
    
    return dict

print(test_language(["English", "French"]))