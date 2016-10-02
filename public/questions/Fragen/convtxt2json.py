import json,re



def parse_questions(topic):
    
    f = open(topic + ".txt")
    questions=[]
    q = {}
    answers = []
    for line in f:
        line=line.strip()
        line=line.replace('\\"','"')
        if line == "":
            q["answers"] = answers
            questions.append(q)
            q = {}
            answers = []
        else:
            q_match = re.match("(\d*)\.(.*)",line)
            if q_match is not None and len(q_match.groups()) == 2:
                q["id"]=int(q_match.group(1))
                q["question"]=q_match.group(2)
            else:
                if line[:2] == "x ":
                    answers.append({"correct":"true","answer":line[2:]})
                else:
                    answers.append({"correct":"false","answer":line})
    return {"topic":topic, "questions":questions}
    

topics = []
topics.append(parse_questions("Flugpraxis"))
topics.append(parse_questions("Luftrecht"))
topics.append(parse_questions("Meteorologie"))
topics.append(parse_questions("Technik"))    
questions_json = json.dumps(topics, indent=2, ensure_ascii=False)
print(questions_json)
outfile = open("questions.json","w")
outfile.write(questions_json)
