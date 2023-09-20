import { User } from './user';
import { UserService } from './user.service';
import fs from 'fs';

export class UserJSONService implements UserService {
    
    add(username: string): User {
        try {
            const jsonData = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
      
            // Ajouter le nouvel utilisateur (de type string) au tableau
            const newUserId = jsonData.user.length + 1;
      
            const newUser: User = {
              id: newUserId,
              username: username,
            };
      
            jsonData.user.push(newUser);
      
            fs.writeFileSync('./users.json', JSON.stringify(jsonData, null, 2), 'utf-8');
            
            return newUser; // Retournez le nouvel utilisateur ajouté
          } catch (error) {
            throw new Error(`User not added`);
          }
    }

    getById(id: number): User | null {
        try {
            const jsonData = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
            const user = jsonData.user.find((user: any) => user.id === id);
        
            if (!user) {
              throw new Error(`Utilisateur with ID(${id}) not found.`);
            }
        
            return user;
          } catch (error) {
            throw new Error(`User with ID(${id}) doesn't exist.`);
          }
    }
}
