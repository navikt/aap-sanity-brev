import groq from 'groq'

export const query = groq`
*[_type=="mal"] {
  overskrift,
  delmaler[] {
    ...,
    obligatorisk,
    delmal -> {
      ...,
      tittel,
      teksteditor[] {
        ...,
        _type == 'block' => {
          children[] {
            ...,
            _type != 'block' => {
              ...
            },
            _type == 'faktagrunnlag' => @-> {
            ...
              }
          }
        },
        _type == 'valgRef' => {
          obligatorisk,
          valg -> {
            valg[] {
              _type == 'fritekst' => {
                ...
              },
              _type == 'gruppertTekstRef' => {
                ...,
                valg -> {
                  title,
                  teksteditor[] {
                    ...,
                    children[] {
                      ...,
                      _type != 'faktagrunnlag' => {
                        ...
                      },
                      _type == 'faktagrunnlag' => @-> {
                          ...
                      }
                    }
                  }
                },
                valgGruppe -> {
                  ...
                  }
                }
              }
          }
        },
        _type == 'periodetekstRef' => {
          periodetekst -> {
            ...
          }
        },
        _type == 'betingetTekst' => {
          ...,
          tekst -> {
            ...
          },
          grupper[] -> {
            ...
          }
        }
      }
    }
  }
}
`
