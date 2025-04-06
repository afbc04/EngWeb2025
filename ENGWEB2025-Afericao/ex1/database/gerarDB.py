import json

def main():
    
    with open("dataset.json", 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Livros
    livros = []
    campos_com_lista = ["genres", "characters", "awards", "ratingsByStars", "setting"]
    campos_com_numeros = ["rating", "numRatings", "likedPercent","bbeScore", "bbeVotes", "price"]
    
    for livro in data:
        
        livro['_id'] = livro['bookId']
        livro.pop('bookId')
        
        for i in campos_com_lista:
            
            if i in livro and isinstance(livro[i], str):
                
                lista_extraida = livro[i][2:-2]
                livro[i] = [x.strip().strip("'").strip('"') for x in lista_extraida.split(",")]

       
        
        for j in campos_com_numeros:
            
            if j in livro and isinstance(livro[j], str) and livro[j].strip() != "":
                try:
                    livro[j] = float(livro[j])
                except ValueError:
                    pass
    
    autor_id = 1
    lista = {}
    
    autores = []

    for item in data:
        
        autor = item['author']
        
        if autor not in lista:
            new_autor = {}
            new_autor['name'] = autor
            new_autor['_id'] = 'author' + str(autor_id)
            new_autor['books'] = []
            autor_id += 1    
            lista[autor] = new_autor
            
        lista[autor]['books'].append({
                    'bookId': item['_id'],
                    'title': item['title'],
                    'series': item['series'],
                    'pages': item['pages'],
                    'publishDate': item['publishDate']})
        
                
        item['author_id'] = lista[autor]['_id']
        livros.append(item)
            
    for i in lista.keys():
        lista[i]['books_count'] = len(lista[i]['books'])
        autores.append(lista[i])
        
        
    with open("autores.json", 'w', encoding='utf-8', newline='\n') as f:
        json.dump(autores, f, indent=4, ensure_ascii=False)
        
    with open("livros.json", 'w', encoding='utf-8', newline='\n') as f:
        json.dump(livros, f, indent=4, ensure_ascii=False)
 

main()